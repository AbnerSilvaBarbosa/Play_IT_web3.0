const main = async () => {
    //Para fazer o deploy de algo na blockchain, precisamos ter um endereço de carteira! A Hardhat faz isso para nós magicamente em segundo plano, mas aqui pegamos o endereço da carteira do proprietário do contrato e também pegamos um endereço aleatório da carteira e chamamos de randomPerson.Isso fará mais sentido em um momento.
    const [owner, randomPerson] = await hre.ethers.getSigners();


    //Esse trecho compilará nosso contrato e gerará os arquivos necessários que precisamos para trabalhar com nosso contrato no diretório artifacts.Vá dar uma olhada depois que colocar para executar 😊
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");


    // O que está acontecendo aqui é que a Hardhat criará uma rede Ethereum local, mas apenas para este contrato.Então, depois que o script for concluído, ele destruirá essa rede local.Então, toda vez que você executar o contrato, será uma nova blockchain.
    const waveContract = await waveContractFactory.deploy();


    //Vamos esperar até que o nosso contrato seja oficialmente implantado na nossa blockchain local! Nosso constructor é executado quando fazemos o deploy.
    await waveContract.deployed();

    //Finalmente, uma vez implantado, o waveContract.address basicamente nos dará o endereço do contrato.Este endereço é a forma como podemos encontrar nosso contrato na blockchain.Existem milhões de contratos no blockchain real.Assim, este endereço nos dá acesso fácil ao contrato com o qual estamos interessados em trabalhar! Isso será mais importante um pouco mais tarde, quando implantarmos em uma rede Ethereum real.
    console.log("Contract deployed to:", waveContract.address);

    console.log("Contract deployed by:", owner.address)

    let db = []


    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait()

    waveCount = await waveContract.getTotalWaves()

    for (let i = 0; i < 3; i++) {

        waveTxn = await waveContract.connect(randomPerson).wave();
        await waveTxn.wait()

        db.push({ address: randomPerson })
    }

    waveCount = await waveContract.getTotalWaves()

    console.log("Endereços que derão tchauzinho!", db)
}

const runMain = async () => {
    try {
        await main();
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain();