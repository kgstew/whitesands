module.exports = {
  apps: [{
    name: 'whitesands',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-34-226-217-209.compute-1.amazonaws.com',
      key: '~/.ssh/whitesands_ec2.pem',
      ref: 'origin/master',
      repo: 'git@github.com:kgstew/whitesands.git',
      path: '/home/ubuntu/whitesands',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
