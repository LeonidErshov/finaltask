'use client';

import { useState } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { parseEther, formatEther } from "ethers";
import deployedContracts from "../contracts/deployedContracts"; // Импорт данных контракта

export default function Home() {
  const { address: userAddress, isConnected } = useAccount();  // Получаем адрес пользователя и статус подключения

  // Получаем адрес и ABI для контракта
  const { address, abi } = deployedContracts[31337].PaymentContract;

  // Инициализация контракта для чтения данных
  const { data: balance } = useContractRead({
    address: address,
    abi: abi,
    functionName: "getBalance",
  });

  // Инициализация контракта для записи данных
  const { writeAsync, isLoading } = useContractWrite({
    address: address,
    abi: abi,
    functionName: "withdraw",
  });

  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);  // Состояние для хранения суммы вывода
  const [recipient, setRecipient] = useState<string>("");  // Состояние для хранения адреса получателя
  const [loading, setLoading] = useState<boolean>(false);  // Состояние загрузки

  const handleWithdraw = async () => {
    if (writeAsync && userAddress) {
      setLoading(true);
      try {
        // Вызов функции с передачей аргументов
        const tx = await writeAsync({
          args: [parseEther(withdrawAmount.toString()), recipient],
          gasLimit: 1000000,  // Фиксированный лимит газа
        });

        await tx.wait();  // Ожидаем завершения транзакции
        alert("Withdrawal successful!");
      } catch (error) {
        console.error("Ошибка при выводе средств:", error);
        alert("Error withdrawing funds. Please check the console for more details.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h1>Payment Contract</h1>
      <p>Contract Balance: {balance ? formatEther(balance) : 0} ETH</p>

      {isConnected ? (
        <div>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount (ETH)"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
          />
          <button
            onClick={handleWithdraw}
            disabled={loading || isLoading}
          >
            {loading || isLoading ? "Processing..." : "Withdraw"}
          </button>
        </div>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
}
