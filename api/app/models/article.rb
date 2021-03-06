# frozen_string_literal: true

class Article < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  before_validation :set_slug, only: %i[create update]
  belongs_to :author, class_name: 'User', validate: true
  has_many :comments, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings
  validates :body, presence: true
  validates :description, presence: true
  validates :slug, presence: true, uniqueness: true
  validates :title, presence: true

  def self.feed_for(user)
    return none unless user.present?

    where(author: user.following)
  end

  def self.tagged_with(tag)
    return none unless tag.present?

    joins(:taggings).where(taggings: { tag: tag }).distinct
  end
end
