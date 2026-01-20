pipeline {
  agent any

  stages {
    stage('List files (debug)') {
      steps {
        sh 'ls -la'
      }
    }

    stage('Build') {
      steps {
        sh '''
          set -e
          echo "Build step running..."
          # add your build commands here (npm install / python -m venv etc)
        '''
      }
    }
  }
}
