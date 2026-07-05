'use client'

import { useState, useEffect } from 'react';
import { monsterService, Monster } from '../services/monsterService';
import MonsterCard from '../components/MonsterCard';
import MonsterForm from '../components/MonsterForm';

export default function Home() {
    const [apiMonster, setApiMonster] = useState<Monster | null>(null);
    const [loading, setLoading] = useState(false);
    const [apiList, setApiList] = useState<any[]>([]);
    
    const [meusMonstros, setMeusMonstros] = useState<Monster[]>([]);
    const [monsterParaEditar, setMonsterParaEditar] = useState<Monster | null>(null);
    const [exibirFormulario, setExibirFormulario] = useState(false);

    useEffect(() => {
        const carregarDadosIniciais = async () => {
            try {
                const lista = await monsterService.fetchApiList();
                setApiList(lista);
            } catch (error) {
                console.error(error);
            }
            setMeusMonstros(monsterService.getCriados());
        };
        carregarDadosIniciais();
    }, []);

    const handleGerarAleatorio = async () => {
        if (apiList.length === 0) return;
        setLoading(true);
        try {
            const randomIdx = Math.floor(Math.random() * apiList.length);
            const selecionado = apiList[randomIdx];
            const dados = await monsterService.fetchApiMonster(selecionado.index);
            setApiMonster(dados);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSalvarMonstro = (dadosForm: any) => {
        const atualizados = monsterService.salvar(dadosForm);
        setMeusMonstros(atualizados);
        setExibirFormulario(false);
        setMonsterParaEditar(null);
    };

    const handleDeletarMonstro = (index: string) => {
        const atualizados = monsterService.deletar(index);
        setMeusMonstros(atualizados);
    };

    const handleIniciarEdicao = (monster: Monster) => {
        setMonsterParaEditar(monster);
        setExibirFormulario(true);
    };

    return (
        <main style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <h1>Gerenciador de Monstros de D&D</h1>

            <section style={{ textAlign: 'center' }}>
                <button onClick={handleGerarAleatorio} disabled={loading || apiList.length === 0} className="btn-gerar">
                    {loading ? 'Invocando...' : 'Gerar Monstro da API'}
                </button>
                {apiMonster && <MonsterCard monster={apiMonster} />}
            </section>

            <hr style={{ width: '100%' }} />

            <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <h2>Meus Monstros Customizados (CRUD)</h2>
                
                {!exibirFormulario && (
                    <button onClick={() => setExibirFormulario(true)}>Criar Novo Monstro</button>
                )}

                {exibirFormulario && (
                    <MonsterForm 
                        monsterParaEditar={monsterParaEditar}
                        onSalvar={handleSalvarMonstro}
                        onCancelar={() => {
                            setExibirFormulario(false);
                            setMonsterParaEditar(null);
                        }}
                    />
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                    {meusMonstros.map((m) => (
                        <MonsterCard 
                            key={m.index} 
                            monster={m} 
                            onEdit={handleIniciarEdicao}
                            onDelete={handleDeletarMonstro}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}