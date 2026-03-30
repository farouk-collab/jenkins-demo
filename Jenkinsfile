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
                bat 'copy /Y package.%DEPENDENCY_PROFILE%.json package.json'
                bat 'npm install'
            }
        }

        stage('Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Dependency Audit') {
            steps {
                bat 'npm run security'
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
