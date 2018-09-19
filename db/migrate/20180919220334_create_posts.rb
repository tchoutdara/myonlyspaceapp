class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :mood
      t.text :post_space
      t.string :author

      t.timestamps
    end
  end
end
