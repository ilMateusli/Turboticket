const fs = require('fs');
const path = require('path');

function printDirectoryTree(dir, indent = '', outputFile) {
    const files = fs.readdirSync(dir);

    files.forEach((file, index) => {
        const filePath = path.join(dir, file);
        const isLast = index === files.length - 1;

        if (fs.statSync(filePath).isDirectory()) {
            outputFile.write(indent + (isLast ? '└── ' : '├── ') + file + '/\n');
            printDirectoryTree(filePath, indent + (isLast ? '    ' : '│   '), outputFile);
        } else {
            outputFile.write(indent + (isLast ? '└── ' : '├── ') + file + '\n');
        }
    });
}

const rootDirectory = './frontend';
const outputFileName = 'arvore-de-diretorios.txt';

const outputFile = fs.createWriteStream(outputFileName);

outputFile.write(rootDirectory + '\n');
printDirectoryTree(rootDirectory, '', outputFile);

outputFile.end(() => {
    console.log('Arvore de diretórios e arquivos salva em ' + outputFileName);
});