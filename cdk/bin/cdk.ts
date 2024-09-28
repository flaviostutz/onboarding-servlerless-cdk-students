#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { MyApiStack } from '../lib/cdk-stack';

const app = new cdk.App();

// eslint-disable-next-line no-new
new MyApiStack(app, 'MyApiStack');
