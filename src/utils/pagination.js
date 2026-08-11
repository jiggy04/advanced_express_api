const getPagination = (query) => {
    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;

    return {
        limit,
        page,
        skip
    };
};

module.exports = {
    getPagination
};
