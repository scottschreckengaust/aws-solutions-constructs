/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */

/// !cdk-integ *
import { App, Stack, RemovalPolicy } from "aws-cdk-lib";
import { BucketEncryption } from "aws-cdk-lib/aws-s3";
import { KinesisStreamsToKinesisFirehoseToS3 } from "../lib";
import { generateIntegStackName, suppressAutoDeleteHandlerWarnings } from '@aws-solutions-constructs/core';

const app = new App();

// Empty arguments
const stack = new Stack(app, generateIntegStackName(__filename));

new KinesisStreamsToKinesisFirehoseToS3(stack, 'test-kinesisfirehose-s3', {
  bucketProps: {
    removalPolicy: RemovalPolicy.DESTROY,
  },
  loggingBucketProps: {
    removalPolicy: RemovalPolicy.DESTROY,
    autoDeleteObjects: true,
    encryption: BucketEncryption.S3_MANAGED,
    versioned: true
  },
  logGroupProps: {
    removalPolicy: RemovalPolicy.DESTROY
  }
});
suppressAutoDeleteHandlerWarnings(stack);
app.synth();