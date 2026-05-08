export class VertexService {
  async invoke<ModelInput, ModelOutput>(
    _endpoint: string,
    _payload: ModelInput,
    fallback: ModelOutput,
  ): Promise<ModelOutput> {
    return fallback;
  }
}
