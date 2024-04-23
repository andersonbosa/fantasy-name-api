export async function generateController(c) {
  try {
    const pattern = req.params.pattern; // Obtenha o parâmetro 'pattern' da URL
    const dataGenerated = await GeneratorService({ pattern, limit: 1000 }); // Chame o serviço de geração de dados
    res.json({ // Envie uma resposta JSON com os dados gerados
      data: dataGenerated,
      metadata: {} // Se necessário, adicione metadados aqui
    });
  } catch (error) {
    console.error('Erro ao gerar dados:', error);
    res.status(500).json({ error: 'Erro ao gerar dados' }); // Envie uma resposta de erro se ocorrer um erro durante a geração de dados
  }
}