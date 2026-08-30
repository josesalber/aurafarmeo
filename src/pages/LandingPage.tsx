import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Flame, Radio, Swords, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { AuraCounter } from '../components/aura/AuraCounter';

export function LandingPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-10 lg:grid-cols-[0.9fr_1.1fr]">
      <section>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-4 py-2 text-sm font-bold uppercase text-fuchsia-100">
          <img src="/logo.png" alt="" aria-hidden="true" className="size-5 rounded-sm object-contain" />
          Batallas en vivo
        </div>
        <h1 className="font-display text-5xl leading-tight text-white sm:text-6xl lg:text-7xl">
          FARMEA AURA.
          <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.75)]">DOMINA LA BATALLA.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-slate-300">
          Entra a la arena, demuestra tu poder y consigue el apoyo de la comunidad.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/login">Entrar a la arena</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to="/login">Ser jurado</Link>
          </Button>
        </div>
      </section>

      <section aria-label="Vista previa de batalla" className="relative">
        <div className="absolute -inset-4 rounded-[2rem] bg-fuchsia-500/20 blur-3xl" aria-hidden="true" />
        <Card className="relative overflow-hidden p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-black uppercase text-rose-100">
              <Radio aria-hidden="true" className="size-3.5" />
              Live
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-slate-300">
              <Eye aria-hidden="true" className="size-4" />
              2.341 espectadores
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {['AuraKing', 'NeonBlade'].map((name, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                className="rounded-lg border border-white/10 bg-slate-950/70 p-3"
              >
                <div className="grid aspect-video place-items-center overflow-hidden rounded-md bg-[radial-gradient(circle,rgba(217,70,239,0.24),rgba(15,23,42,1)_64%)]">
                  <div className="grid size-24 place-items-center rounded-full border border-cyan-200/30 bg-white/10 font-display text-3xl text-white">{name.slice(0, 2)}</div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-display text-xl text-white">{name}</p>
                  <AuraCounter value={index === 0 ? 8532 : 8120} />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-lg bg-white/[0.04] p-4 text-center">
            <span className="inline-flex justify-center gap-2 text-cyan-100"><Zap aria-hidden="true" className="size-5" />15.230</span>
            <Swords aria-hidden="true" className="size-6 text-fuchsia-200" />
            <span className="inline-flex justify-center gap-2 text-rose-100"><Flame aria-hidden="true" className="size-5" />14.982</span>
          </div>
        </Card>
      </section>
    </main>
  );
}
