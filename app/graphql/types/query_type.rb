module Types
  class QueryType < Types::BaseObject
    field :all_shops, [ShopType], null: false

    def all_shops
      Shop.all
    end
  end
end
