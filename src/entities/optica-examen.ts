export interface OpticaExamenOjo {
  esfera: number;
  cilindro: number;
  grados: number;
  distanciaInterPupilar: number | null;
}

export interface OpticaExamen {
  id: string;
  patientId: string;
  optometristaId: string;
  tipoMicaRecomendadaId: string;
  tipoMicaRecomendada: string;
  materialRecomendadoId: string;
  materialRecomendado: string;
  esReceta: boolean;
  adicion: number | null;
  altura: number | null;
  observaciones: string | null;
  oftalmologo: string | null;
  fecha: string | null;
  ojoDerecho: OpticaExamenOjo | null;
  ojoIzquierdo: OpticaExamenOjo | null;
}
