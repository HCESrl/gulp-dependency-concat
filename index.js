var through = require('through2'),
    gutil   = require('gulp-util');

module.exports = function(options) {
    var output = '//gulp-dependency-concat dynamically generated file, do NOT edit\n';

    //Options init
    options = options || {};
    options.name    = options.name || function () { return 'results.txt'};
    options.prefix  = options.prefix || function () { return ''; };
    options.suffix  = options.suffix || function () { return ''; };

    /**
     * Concatenates the files' relative paths
     * @param file
     * @param encoding
     * @param callback
     */
    function dependencyConcat(file, encoding, callback) {
        output += options.prefix + file.relative + options.suffix + '\n';
        this.push(file);
        return callback();
    }

    /**
     * Writes a File object that will be pushed out to gulp
     * @param callback
     */
    function endStream(callback) {
        var outFile = new gutil.File({
            cwd: './',
            path: './' + options.name,
            contents: new Buffer(output)
        });
        this.push(outFile);

        callback();
    }

    return through.obj(dependencyConcat, endStream);
};