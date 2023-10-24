# Atualizar Cabana

> ## Caso de sucesso

1. ❌ Recebe uma requisição do tipo **PUT** na rota **/api/cabins/{survey_id}/results**
2. ❌ Valida se a requisição foi feita por um **usuário**
3. ❌ Valida o parâmetro **cabin_id**
4. ❌ **Atualiza** a cabana com os dados fornecidos
5. ❌ Retorna **200** com os dados da cabana

> ## Exceções

1. ❌ Retorna erro **404** se a API não existir
2. ❌ Retorna erro **403** se não for um usuário
3. ❌ Retorna erro **403** se o cabin_id passado na URL for inválido
4. ❌ Retorna erro **500** se der erro ao tentar atualizar a cabin
5. ❌ Retorna erro **500** se der erro ao tentar carregar a cabin
