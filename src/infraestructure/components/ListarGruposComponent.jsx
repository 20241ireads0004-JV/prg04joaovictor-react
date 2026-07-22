import React, { useEffect, useState } from "react";
import { listarGrupos } from "../services/grupoService"; // Ajuste o caminho relativo para a pasta services

/**
 * Componente responsável por buscar e exibir a lista de grupos esportivos.
 */
function ListaGruposComponent() {
    // Estado para armazenar a lista de grupos
    const [grupos, setGrupos] = useState([]);
    
    // Estado para controlar a exibição do texto "Carregando..."
    const [carregando, setCarregando] = useState(true);

    // useEffect executa assim que o componente é montado na tela
    useEffect(() => {
        async function carregarDados() {
            try {
                // Chama a API através da função de serviço
                const dados = await listarGrupos();
                setGrupos(dados);
            } catch (erro) {
                console.error("Erro ao carregar grupos:", erro);
            } finally {
                // Finaliza o estado de carregamento, independentemente de sucesso ou erro
                setCarregando(false);
            }
        }

        carregarDados();
    }, []); // Array vazio [] garante que a busca seja feita apenas uma vez

    // Renderização condicional enquanto os dados são carregados
    if (carregando) return <p>Carregando grupos esportivos...</p>;

    // Renderização da lista de grupos
    return (
        <div className="container-grupos">
            <h2>Grupos Esportivos Cadastrados</h2>
            {grupos.length === 0 ? (
                <p>Nenhum grupo encontrado.</p>
            ) : (
                <ul>
                    {grupos.map((grupo) => (
                        <li key={grupo.id}>{grupo.nome}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ListaGruposComponent;