module Types
  class ApplicationFormAttributes < Types::BaseInputObject
    argument :email, String, required: true
    argument :fullName, String, required: true
    argument :instagram, String, required: true
    argument :phoneNumber, String, required: true
    argument :shopClassification, String, required: true
    argument :shopName, String, required: true
    argument :webSiteUrl, String, required: true
  end
end
