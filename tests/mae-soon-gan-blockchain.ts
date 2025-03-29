import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { MaeSoonGanBlockchain } from "../target/types/mae_soon_gan_blockchain";

describe("mae-soon-gan-blockchain", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.MaeSoonGanBlockchain as Program<MaeSoonGanBlockchain>;
  let counterAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    await program.methods.initialize().accounts({
      counter: counterAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([counterAccount]).rpc();

    const account = await program.account.counter.fetch(counterAccount.publicKey);
    console.log("Counter account: ", account.count.toString());
  });

  it("Increments the counter!", async () => {
    await program.methods.increment().accounts({
      counter: counterAccount.publicKey,
    }).rpc();

    const account = await program.account.counter.fetch(counterAccount.publicKey);
    console.log("Counter after increment: ", account.count.toString());
  });
});
