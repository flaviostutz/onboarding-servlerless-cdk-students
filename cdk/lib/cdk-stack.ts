import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
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

    // Lambda function to handle GET /person
    const getAllPersonsLambda = new NodejsFunction(this, 'GetAllPersonsLambda', {
      entry: 'cdk/lambda/getAllPersons.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        minify: true,
      },
      depsLockFilePath: '../pnpm-lock.yaml',
    });

    // Lambda function to handle GET /person/{id}
    const getPersonByIdLambda = new NodejsFunction(this, 'GetPersonByIdLambda', {
      entry: 'cdk/lambda/getPersonById.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        minify: true,
      },
      depsLockFilePath: '../pnpm-lock.yaml',
    });

    // GET /person route
    const persons = api.root.addResource('person');
    persons.addMethod('GET', new LambdaIntegration(getAllPersonsLambda));

    // GET /person/{id} route
    const personById = persons.addResource('{id}');
    personById.addMethod('GET', new LambdaIntegration(getPersonByIdLambda));
  }
}
