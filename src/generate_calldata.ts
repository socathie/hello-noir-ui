import { create_proof } from '@noir-lang/barretenberg/dest/client_proofs';
import setup_generic_prover from "./setup_generic_prover";
import initAztec from "@noir-lang/aztec_backend";
import initNoir from '@noir-lang/noir_wasm';
import { acir_from_bytes } from '@noir-lang/noir_wasm';

export interface abi {
    x: number,
    y: number,
}

export async function generateCalldata(input: abi) {
    await initAztec("./aztec_backend_bg.wasm");
    await initNoir("./noir_wasm_bg.wasm");

    let response = await fetch('main.buf');
    let buffer = await response.arrayBuffer();
    const circuit = new Uint8Array(buffer);
    
    let [prover, ] = await setup_generic_prover(circuit);

    response = await fetch('acir.buf');
    buffer = await response.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const acir = acir_from_bytes(bytes);

    console.log(acir);
    
    const proof = await create_proof(prover, acir, input);

    return proof;
}