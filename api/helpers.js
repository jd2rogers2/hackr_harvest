const isAllowedFileType = fileType => {
    return fileType === 'image/jpeg' || fileType === 'image/jpg' || fileType === 'image/png';
}


module.exports = {
    isAllowedFileType,
};
