# frozen_string_literal: true

module Mutations
  class FollowUser < Mutations::BaseMutation
    argument :username, ID, required: true
    field :user, Types::UserType, null: true

    def resolve(username:)
      user = User.find_by(username: username)

      authorize! user, to: :follow?
      relationship = Relationship.create!(followed: user, follower: context[:current_user])

      { user: relationship.followed }
    end
  end
end
