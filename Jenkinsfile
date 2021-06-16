pipeline {
  agent any
  stages {
    stage('Install Client Dependency') {
      steps {
        sh 'cd client && npm install'
      }
    }

    stage('Test Client') {
      steps {
        sh 'cd client && npm test'
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