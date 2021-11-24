module.exports = mongoose => {
    const Nft = mongoose.model(
        "nft",
        mongoose.Schema(
            {
                title: String,
                name: { type: String, required: true },
                description: String,
                tags: [String],
                url: String,
                collectionId: String,
                number: String,
                batch: String,
                ownerId: String,
                creatorId: String,
            },
            { timestamps: true }
        )
    );

    return Nft;
};