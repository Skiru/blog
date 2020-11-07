#!/usr/bin/env groovy

pipeline {
    environment {
        HOME = "${WORKSPACE}"
        REGISTRY = "mkoziol/purpleclouds"
        REGISTRY_CREDENTIALS = 'dockerhub'
        GITHUB_CREDENTIALS = 'github-credential'
        PHP_IMAGE = ""
        ASSETS_IMAGE = ""
        PHP_IMAGE_NAME = "blog-php"
        ASSETS_IMAGE_NAME = "blog-assets"
        FULL_PHP_IMAGE_NAME = "${REGISTRY}:${PHP_IMAGE_NAME}-${BUILD_NUMBER}"
        FULL_ASSETS_IMAGE_NAME = "${REGISTRY}:${ASSETS_IMAGE_NAME}-${BUILD_NUMBER}"
    }

    agent any

    stages {

        stage('Clean environment') {
            steps{
                sh '''
                git reset --hard HEAD
                git clean -fdx
                '''
            }
        }

        stage('PHP Base Image') {
            steps {
                script {
                    docker.withRegistry('', REGISTRY_CREDENTIALS ) {
                        sh "docker pull mkoziol/purpleclouds:php-base"
                    }
                }
            }
        }

        stage('Get code from SCM') {
            steps{
                checkout(
                    [$class: 'GitSCM', branches: [[name: '*/master']],
                     doGenerateSubmoduleConfigurations: false,
                     extensions: [],
                     submoduleCfg: [],
                     userRemoteConfigs: [[credentialsId: "${GITHUB_CREDENTIALS}", url: "git@github.com:Skiru/blog.git"]]]
                )
            }
        }

        stage('Docker') {
            parallel {
                stage('Building php image') {
                  steps{
                    script {
                      PHP_IMAGE = docker.build(FULL_PHP_IMAGE_NAME, "-f ./docker/php/Dockerfile . --no-cache")
                    }
                  }
                }

                stage('Building assets image') {
                  steps{
                    script {
                      ASSETS_IMAGE = docker.build(FULL_ASSETS_IMAGE_NAME, "-f ./docker/assets/Dockerfile . --no-cache")
                    }
                  }
                }
            }
        }


        stage('Dockerhub') {
            parallel {
              stage('Deploy php image to dockerhub') {
                  steps{
                      script {
                        docker.withRegistry('', REGISTRY_CREDENTIALS ) {
                          PHP_IMAGE.push()
                        }
                      }
                 }
              }

              stage('Deploy assets image to dockerhub') {
                  steps{
                      script {
                        docker.withRegistry('', REGISTRY_CREDENTIALS ) {
                          ASSETS_IMAGE.push()
                        }
                      }
                 }
              }
            }
        }

        stage('Build blog application') {
            steps{
                sshagent (credentials: ['purple-clouds-server']) {
                    sh 'echo \
                    "docker login --username mkoziol --password pamietamhaslo;\
                    export BLOG_ASSETS_IMAGE_BUILD_TAG=${FULL_ASSETS_IMAGE_NAME};\
                    export BLOG_PHP_IMAGE_BUILD_TAG=${FULL_PHP_IMAGE_NAME};\
                    docker-compose -f /var/www/PurpleClouds/blog/docker-compose.yml up -d;\
                    docker image prune -a -f || true;"\
                    | ssh -o StrictHostKeyChecking=no -l root 77.55.222.35;'
                }
            }
        }

    }  // stages

    post {
        always {
            script {
                sh "docker rmi -f ${env.FULL_PHP_IMAGE_NAME}"
                sh "docker rmi -f ${env.FULL_ASSETS_IMAGE_NAME}"
            }
        }
    }
}
