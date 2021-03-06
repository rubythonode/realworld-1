# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def follow?
    another_user?
  end

  def unfollow?
    another_user?
  end

  def update?
    owner?
  end

  private

  def owner?
    user? && user.id == record.id
  end

  def another_user?
    user? && user.id != record.id
  end
end
