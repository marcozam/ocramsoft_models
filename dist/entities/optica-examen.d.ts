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
    tipoMicaRecomendadaId: number;
    tipoMicaRecomendada: string;
    materialRecomendadoId: number;
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
export interface CreateOpticaExamenRequest {
    patientId: string;
    tipoMicaRecomendadaId: number;
    materialRecomendadaId: number;
    esReceta: boolean;
    adicion?: number | null;
    altura?: number | null;
    observaciones?: string | null;
    oftalmologo?: string | null;
    ojoDerecho: OpticaExamenOjo;
    ojoIzquierdo: OpticaExamenOjo;
}
//# sourceMappingURL=optica-examen.d.ts.map