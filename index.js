var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
    console.log(Object.keys(req));
    console.log(req.url)
    if (req.url != '/') {
        // res.write(req.url);
        filename = req.url.substr(1);
        // res.write(filename);
        console.log(fs.existsSync('./' + filename));
        if (fs.existsSync('./' + filename)) {
            fs.readFile('./' + filename, { encoding: "utf-8" }, (err, html) => {
                if (err) {
                    res.writeHead(404);
                    console.log('404 ?');
                    res.end(err.code);
                    return;
                }
                res.setHeader('Content-Type', 'text/html');
                console.log('reading ?')
                res.write(html);
                res.end();

            });
            return;
        } else {
            fs.writeFile(filename + ".html", "this is " + filename + "!", function(err) {
                if (err) {
                    res.writeHead(404);
                    res.end(err.code);
                    return;
                }
                res.setHeader('Content-Type', 'text/html');
                res.write('file not found so I made it,reload url to see');
                console.log(filename + '.html');
                res.end();
            });
        }

    } else {
        res.write('req.url is not provided!');
        res.end();
    }

});

server.listen(3000, 'localhost')