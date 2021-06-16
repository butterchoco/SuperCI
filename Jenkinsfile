pipeline {
  agent any
  stages {
    stage('Install Dependency') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
      post {
        always {
          junit 'client/junit.xml'
        }
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker-compose -f docker-compose.yml up -d --build'
      }
    }

  }

}