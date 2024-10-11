import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import {
  ApiKey,
  ApiKeySourceType,
  Cors,
  RestApi,
  UsagePlan,
  LambdaIntegration,
} from 'aws-cdk-lib/aws-apigateway';

export class MyApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create our DynamoDB table
    const dbTable = new dynamodb.Table(this, 'DbTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
      tableName: 'Person',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // API Gateway to expose the Lambda functions
    const api = new RestApi(this, 'RestAPI', {
      restApiName: 'RestAPI',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
      apiKeySourceType: ApiKeySourceType.HEADER,
    });

    const apiKey = new ApiKey(this, 'ApiKey');

    const usagePlan = new UsagePlan(this, 'UsagePlan', {
      name: 'Usage Plan',
      apiStages: [
        {
          api,
          stage: api.deploymentStage,
        },
      ],
    });
    usagePlan.addApiKey(apiKey);

    // Lambda function to handle POST /person
    const createUserLambda = new NodejsFunction(this, 'CreateUserLambda', {
      entry: 'cdk/resources/endpoints/createUser.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        minify: true,
      },
      depsLockFilePath: 'pnpm-lock.yaml',
      environment: {
        TABLE_NAME: dbTable.tableName,
      },
    });

    // Lambda function to handle GET all /person
    const getAllPersonsLambda = new NodejsFunction(this, 'GetAllPersonsLambda', {
      entry: 'cdk/resources/endpoints/getAllPersons.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        minify: true,
      },
      depsLockFilePath: 'pnpm-lock.yaml',
      environment: {
        TABLE_NAME: dbTable.tableName,
      },
    });

    // Lambda function to handle GET /person/{id}
    const getPersonByIdLambda = new NodejsFunction(this, 'GetPersonByIdLambda', {
      entry: 'cdk/resources/endpoints/getPersonById.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        minify: true,
      },
      depsLockFilePath: 'pnpm-lock.yaml',
      environment: {
        TABLE_NAME: dbTable.tableName,
      },
    });

    // Grant our Lambda functions access to our DynamoDB table
    dbTable.grantReadWriteData(createUserLambda);
    dbTable.grantReadWriteData(getAllPersonsLambda);
    dbTable.grantReadWriteData(getPersonByIdLambda);

    // Define our API Gateway endpoints
    const persons = api.root.addResource('person');

    // POST /person route
    persons.addMethod('POST', new LambdaIntegration(createUserLambda), {
      apiKeyRequired: true,
    });

    // GET /person route
    persons.addMethod('GET', new LambdaIntegration(getAllPersonsLambda), {
      apiKeyRequired: true,
    });

    // GET /person/{id} route
    const personById = persons.addResource('{id}');
    personById.addMethod('GET', new LambdaIntegration(getPersonByIdLambda), {
      apiKeyRequired: true,
    });

    // Misc: Outputs
    // eslint-disable-next-line no-new
    new cdk.CfnOutput(this, 'API Key ID', {
      value: apiKey.keyId,
    });
  }
}
