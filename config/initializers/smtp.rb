ActionMailer::Base.smtp_settings = {
  address: 'smtp.sendgrid.net',
  port: 587,
  user_name: ENV['SENDGRID_USERNAME'],
  password: ENV['SENDGRID_PASSWORD'],
  domain:  ENV['SENDGRID_EMAIL_DOMAIN'], 
  authentication: :login,
  enable_starttls_auto: true
}
