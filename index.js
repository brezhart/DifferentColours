

//screenshots must be 1.png, 2.png,3.png



( async ()=> {
    const fs = require('fs');
    const path = ''; // LINK TO SCREENSHOTS

    const {createCanvas, loadImage} = require('canvas');
    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext('2d');


    // let files = fs.readdirSync(path);


    function getData(y, x) {
        let data = ctx.getImageData(x, y, 1, 1).data;
        return [data[0], data[1], data[2]]
    }

    let colors = [];
    for (let i = 0; i < 256; i++) {
        let f = [];
        for (let g = 0; g < 256; g++) {
            let s = [];
            for (let j = 0; j < 256; j++) {
                s.push(0);
            }
            f.push(s)
        }
        colors.push(f)
    }
    let total = 0;
    for (let c = 0; c < 22900; c++) {
        try {
            let image = await loadImage(`${path}/${c}.png`);
            ctx.drawImage(image, 0, 0, 512, 512);
            let newFound = 0;
            for (let i = 0; i < 512; i++) {
                for (let g = 0; g < 512; g++) {
                    let d = getData(i, g);
                    newFound += 1-colors[d[0]][d[1]][d[2]];
                    colors[d[0]][d[1]][d[2]] = 1;
                }
            }
            total+=newFound;
            console.log(`Image: ${c} / ${22900}`);
            console.log(`New Found: ${newFound}`);
            console.log(`total: ${total} | ${total/16777216 * 100}%`);
            console.log(`Finding all possible colors at minectaft screenshot`);
            console.log('----------------------------------------------------');
        } catch (e) {
            console.log("ERROR AT", c)
        }

        if (c%100 == 0){
            console.log("SAVING!");
            fs.writeFileSync('data.txt', JSON.stringify(colors));
        }

    }
    fs.writeFileSync('data.txt', JSON.stringify(colors));
})();
