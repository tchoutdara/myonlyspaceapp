50.times do
    Post.create(
        title: Faker::Movie.quote,
        mood: Faker::Hipster.words,
        post_space: Faker::Hipster.paragraph,
        author: Faker::Name.name
    )
end