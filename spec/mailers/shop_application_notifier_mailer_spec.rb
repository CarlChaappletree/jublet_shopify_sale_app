require "rails_helper"

RSpec.describe ShopApplicationNotifierMailer, type: :mailer, sendgrid: false do

  let(:mail) { ShopApplicationNotifierMailer.send_application_email({email: 'test@example.com'}) }

  it "renders the headers" do
    expect(mail.subject).to eq("Thanks for signing up for our amazing app")
    expect(mail.to).to eq([ENV['SENDGRID_EMAIL_SENDER_DEFAULT']])
    expect(mail.from).to eq([ENV['SENDGRID_EMAIL_SENDER_DEFAULT']])
  end

  it "renders the body" do
    expect(mail.body.encoded).to match("User email: test@example.com")
  end
end
