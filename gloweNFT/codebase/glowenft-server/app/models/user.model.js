module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema(
            {
                first_name: { type: String },
                last_name: { type: String },
                username: { type: String, default: null, required: true },
                email: { type: String, unique: true, required: true },
                password: { type: String, required: true },
                token: { type: String },
                role: { type: String, default: 'artist' },
                profileImage: String,
                coverImage: String
            },
            { timestamps: true }
        )
    );

    return User;
};