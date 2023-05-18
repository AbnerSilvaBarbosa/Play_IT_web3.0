const main = async () => {
    //Para fazer o deploy de algo na blockchain, precisamos ter um endereço de carteira! A Hardhat faz isso para nós magicamente em segundo plano, mas aqui pegamos o endereço da carteira do proprietário do contrato e também pegamos um endereço aleatório da carteira e chamamos de randomPerson.Isso fará mais sentido em um momento.
    const [owner, randomPerson] = await hre.ethers.getSigners();


    //Esse trecho compilará nosso contrato e gerará os arquivos necessários que precisamos para trabalhar com nosso contrato no diretório artifacts.Vá dar uma olhada depois que colocar para executar 😊
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");


    // O que está acontecendo aqui é que a Hardhat criará uma rede Ethereum local, mas apenas para este contrato.Então, depois que o script for concluído, ele destruirá essa rede local.Então, toda vez que você executar o contrato, será uma nova blockchain.
    const waveContract = await waveContractFactory.deploy({ value: hre.ethers.utils.parseEther("0.1") });


    //Vamos esperar até que o nosso contrato seja oficialmente implantado na nossa blockchain local! Nosso constructor é executado quando fazemos o deploy.
    await waveContract.deployed();

    //Finalmente, uma vez implantado, o waveContract.address basicamente nos dará o endereço do contrato.Este endereço é a forma como podemos encontrar nosso contrato na blockchain.Existem milhões de contratos no blockchain real.Assim, este endereço nos dá acesso fácil ao contrato com o qual estamos interessados em trabalhar! Isso será mais importante um pouco mais tarde, quando implantarmos em uma rede Ethereum real.
    console.log("Contract deployed to:", waveContract.address);

    console.log("Contract deployed by:", owner.address)


    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );

    console.log(
        "Saldo do contrato:",
        hre.ethers.utils.formatEther(contractBalance)
    );


    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave("Uma mensagem!");
    await waveTxn.wait()

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Saldo do  contrato:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    waveTxn = await waveContract.connect(randomPerson).wave("Outra mensagem!");
    await waveTxn.wait()

    let allWaves = await waveContract.getAllWaves()
    console.log(allWaves)
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