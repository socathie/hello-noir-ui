import init from '@noir-lang/noir_wasm';
import { compile } from '@noir-lang/noir_wasm';
import { setup_generic_prover_and_verifier, create_proof } from '@noir-lang/barretenberg/dest/client_proofs';

export interface ABI {
    x: number,
    y: number,
}

export async function generateCalldata(input: ABI) {

    await init();
    const compiled_program = compile("./circuits/main.nr");

    let acir = compiled_program.circuit;
    const abi = compiled_program.abi;
    
    abi.x = input.x;
    abi.y = input.y;
    
    let [prover, ] = await setup_generic_prover_and_verifier(acir);
    
    const proof = await create_proof(prover, acir, abi);

    return proof;
}