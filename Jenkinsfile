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
          junit 'junit.xml'
        }
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

  }

}