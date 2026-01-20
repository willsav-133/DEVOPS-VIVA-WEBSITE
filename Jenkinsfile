pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/willsav-133/DEVOPS-VIVA-WEBSITE.git'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t lateness-tracker .'
            }
        }
    }
}
