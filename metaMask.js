class ConnectButton extends React.Component {
  state = {
    connected: false,
    walletAddress: ""
  };

  connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable(); // Aktivera användarens konto
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts',
        params: [
          {
            eth_accounts: {}
          }
        ]
       });
    
       
        const walletAddress = accounts[0];
        this.setState({ connected: true, walletAddress });
      } catch (error) {
        console.error("Användaren vägrade tillgång till sitt konto");
      }
    } else {
      console.log("Installera MetaMask!");
    }
  };





  disconnectMetaMask = async () => {
    if (window.ethereum) {
      try {
       const accounts = await window.ethereum.request({ method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {}
          }
        ] });
        
      } catch (error) {
        console.error("Kunde inte logga ut från MetaMask");
      }
    }
  };







  handleTransaction = async (amount) => {
  if (window.ethereum) {
    try {
      const web3 = new window.Web3(window.ethereum);
      const usdtContractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // Ange USDT-kontraktets adress här
      const usdtContract = new web3.eth.Contract(usdtContractABI, usdtContractAddress);
      const recipientAddress = "0x0F5402333385407E3E004EfB5e59A9b6e4ed899b"; // Ange mottagarens adress här

      const transaction = usdtContract.methods.transfer(recipientAddress, amount);
      const encodedTransaction = transaction.encodeABI();

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];

      await window.ethereum.request({
        "method": "eth_sendTransaction",
        "params": [
          {
            from: walletAddress,
            to: usdtContractAddress,
           
            data: encodedTransaction,
            maxPriorityFeePerGas: "0x3b9aca00",
           maxFeePerGas: "0x2540be400",
            gas: "0x5028"
          }
        ]
      });

      console.log("Transaktion skickad!");
    } catch (error) {
      console.error("Kunde inte skicka transaktionen:", error);
    }
  }
};



render() {
  const { connected, walletAddress } = this.state;
  return (
    <div>
      <button id="connectButton" onClick={connected ? this.disconnectMetaMask : this.connectMetaMask}>
        {connected ? "Disconnect" : "Connect your wallet"}
      </button>
      
      {connected && (
        <div>
          <div id="walletAddress">
            Wallet Address: {walletAddress}
          </div>
          <UsdtButtons handleTransaction={this.handleTransaction}/>
        </div>
      )}

 
    </div>
  );
}

}

class UsdtButtons extends React.Component {
render() {
  return (
    <div>
      <button id="gambelKnapp" onClick={() => this.props.handleTransaction(1)}>1 USDT</button>
      <button id="gambelKnapp" onClick={() => this.props.handleTransaction(5)}>5 USDT</button>
      <button id="gambelKnapp" onClick={() => this.props.handleTransaction(10)}>10 USDT</button>
    </div>
  );
}
}

ReactDOM.render(<ConnectButton />, document.getElementById('root'));




class Countdown extends React.Component {
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  componentDidMount() {
    this.interval = setInterval(this.updateCountdown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateCountdown = () => {
    const now = new Date();
    const nextFriday = new Date();

    nextFriday.setDate(now.getDate() + (5 + 7 - now.getDay()) % 7);
    nextFriday.setHours(12, 0, 0, 0);

  // Ställ in tidszonen till svensk tid
  const swedenTime = new Date(nextFriday.toLocaleString("en-US", {timeZone: "Europe/Stockholm"}));
  const diff = swedenTime - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.setState({ days, hours, minutes, seconds });
  };

  render() {
    const { days, hours, minutes, seconds } = this.state;
  
    return (
      <div className="countdown">
        <h2>Nedräkning till Fredag</h2>
        <p>
          {days > 0 && `${days} Dagar `}
          {hours > 0 && `${hours} Timmar `}
          {minutes > 0 && `${minutes} Minuter `}
          {seconds > 0 && `${seconds} Sekunder`}
        </p>
      </div>
    );
  }
}

ReactDOM.render(<Countdown />, document.getElementById('root2'));




//Pengar i Potten --- Sepolia test NÄT 
class WalletBalance extends React.Component {
  state = {
    balance: 0
  };

  componentDidMount() {
    this.updateBalance();
  }

  updateBalance = async () => {
    const walletAddress = "0x6C94703791e33aE26Ab45Cfba51e4b80b3299a6A"; // Ange plånboksadressen här
    const etherscanApiKey = "9CGMFQAUNXXXTGTVSSCRTSVSG3VJZ8ZUTS"; // Ange din Etherscan API-nyckel här
  
    const response = await fetch(`https://api-sepolia.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${etherscanApiKey}`);
    const data = await response.json();
  
    if (data.status === "1") {
      // Ethereum har 18 decimaler
      const balance = Number(data.result) / 10**18;
      this.setState({ balance });
    } else {
      console.error("Kunde inte hämta saldot:", data.message);
    }
  };
  
  render() {
    return (
      <div className="prisPengar">
        <h2>Pengar i Potten</h2>
        <p>{this.state.balance} ETH</p>
      </div>
    );
  }
}

ReactDOM.render(<WalletBalance />, document.getElementById('root3'));


ReactDOM.render(<WalletBalance />, document.getElementById('root3'));