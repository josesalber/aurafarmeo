import { useCallback, useEffect, useState } from 'react';
import * as battleApi from '../services/api/battleApi';
import { useBattleStore } from '../store/battleStore';
import { useUiStore } from '../store/uiStore';
import type { BattleSummary } from '../types/battle';

export function useBattles() {
  const [battles, setBattles] = useState<BattleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const setError = useUiStore((state) => state.setError);

  useEffect(() => {
    let mounted = true;
    battleApi
      .getBattles()
      .then((data) => mounted && setBattles(data))
      .catch(() => setError('No pudimos cargar las batallas.'))
      .finally(() => mounted && setIsLoading(false));
    return () => {
      mounted = false;
    };
  }, [setError]);

  return { battles, isLoading };
}

export function useBattle(battleId: string | undefined) {
  const setBattle = useBattleStore((state) => state.setBattle);
  const resetBattle = useBattleStore((state) => state.resetBattle);
  const battle = useBattleStore((state) => state.battle);
  const [isLoading, setIsLoading] = useState(true);
  const setError = useUiStore((state) => state.setError);

  const loadBattle = useCallback(async () => {
    if (!battleId) return;
    setIsLoading(true);
    try {
      const data = await battleApi.getBattle(battleId);
      setBattle(data);
    } catch {
      setError('La batalla ya termino.');
    } finally {
      setIsLoading(false);
    }
  }, [battleId, setBattle, setError]);

  useEffect(() => {
    void loadBattle();
    return () => {
      if (battleId) void battleApi.leaveBattle(battleId);
      resetBattle();
    };
  }, [battleId, loadBattle, resetBattle]);

  return { battle, isLoading, reload: loadBattle };
}
