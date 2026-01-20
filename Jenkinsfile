pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t lateness-tracker .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker stop lateness-tracker || true
                docker rm lateness-tracker || true
                docker run -d -p 3000:3000 --name lateness-tracker lateness-tracker
                '''
            }
        }
    }
}
