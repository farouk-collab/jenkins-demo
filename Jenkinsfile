pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Dependency Audit') {
            steps {
                sh 'npm run security'
            }
        }
    }

    post {
        success {
            echo 'build OK / tests OK / dependances verifiees'
        }
        failure {
            echo 'build failed / tests failed / alerte securite possible'
        }
        always {
            echo 'Pipeline termine'
        }
    }
}
