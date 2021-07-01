class ShopApplicationNotifierMailer < ApplicationMailer
  default :from => ENV['SENDGRID_EMAIL_SENDER_DEFAULT']

  # send a signup email to the user, pass in the user object that   contains the user's email address
  def send_application_email(form)
    @form = form

    mail( :to => ENV['SENDGRID_EMAIL_SENDER_DEFAULT'],
    :subject => 'Thanks for signing up for our amazing app' )
  end
end
