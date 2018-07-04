var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
    console.log(Object.keys(req));
    console.log(req.url)
    if (req.url != '/') {
        filename = req.url.substr(1);
        filename = filename + '.html';
        switch (fs.existsSync('./' + filename)) {
            case true:
                fs.readFile('./' + filename, {
                    encoding: "utf-8"
                }, (err, html) => {
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
                break;

            case false:
                fs.writeFile(filename, "this is " + filename + "!", function(err) {
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
                break;
        }
    } else {
        res.write('req.url is not provided!');
        res.end();
    }

});

server.listen(3000, 'localhost');