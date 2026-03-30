pipeline {
    agent any

    parameters {
        choice(
            name: 'DEPENDENCY_PROFILE',
            choices: ['safe', 'vulnerable'],
            description: 'safe doit passer le scan, vulnerable doit echouer sur npm audit'
        )
    }

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
                sh 'cp package.${DEPENDENCY_PROFILE}.json package.json'
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
            echo "build OK / tests OK / dependances verifiees (${params.DEPENDENCY_PROFILE})"
        }
        failure {
            echo "build failed / tests failed / alerte securite possible (${params.DEPENDENCY_PROFILE})"
        }
        always {
            echo 'Pipeline termine'
        }
    }
}
