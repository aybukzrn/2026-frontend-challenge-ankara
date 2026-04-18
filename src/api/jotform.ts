// --- FORM ID REFERANSLARI ---
// Checkins       -> 261065067494966
// Messages       -> 261065765723966
// Sightings      -> 261065244786967
// Personal Notes -> 261065509008958
// Anonymous Tips -> 261065875889981

export const INVESTIGATION_FORM_IDS = {
    checkins: '261065067494966',
    messages: '261065765723966',
    sightings: '261065244786967',
    personalNotes: '261065509008958',
    anonymousTips: '261065875889981',
} as const;

export type InvestigationFormKey = keyof typeof INVESTIGATION_FORM_IDS;


export interface JotformAnswer {
    name: string;
    text: string;
    answer: any;
    type: string;
}

export interface JotformSubmission {
    id: string;
    form_id: string;
    created_at: string;
    answers: Record<string, JotformAnswer>;
}

export interface NormalizedRecord {
    id: string;
    createdAt: string;
    data: Record<string, any>;
}

const ACTIVE_API_KEY = import.meta.env.VITE_JOTFORM_API_KEY || 'ad39735f1449a6dc28d60e0921352665';
const BASE_URL = 'https://api.jotform.com';

interface JotformApiResponse {
    responseCode?: number;
    message?: string;
    content?: unknown;
}


const normalizeSubmission = (submission: JotformSubmission): NormalizedRecord => {
    const normalizedData: Record<string, any> = {};

    Object.values(submission.answers).forEach((ans) => {
        if (ans.text && ans.answer !== undefined && ans.answer !== '') {
            normalizedData[ans.text] = ans.answer;
        }
    });

    return {
        id: submission.id,
        createdAt: submission.created_at,
        data: normalizedData,
    };
};


// ANA VERİ ÇEKME 

export const fetchFormData = async (
    formId: string,
    apiKey: string = ACTIVE_API_KEY
): Promise<NormalizedRecord[]> => {
    try {
        if (!apiKey) {
            throw new Error('Jotform API key bulunamadı. .env dosyasına VITE_JOTFORM_API_KEY ekleyin.');
        }

        const response = await fetch(`${BASE_URL}/form/${formId}/submissions?apiKey=${apiKey}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = (await response.json()) as JotformApiResponse;

        if (responseData.responseCode && responseData.responseCode !== 200) {
            if (responseData.responseCode === 429) {
                throw new Error('Jotform API limiti aşıldı (429). Yeni bir API key deneyin veya daha sonra tekrar deneyin.');
            }
            throw new Error(responseData.message || `Jotform API hatası: ${responseData.responseCode}`);
        }

        if (!Array.isArray(responseData.content)) {
            throw new Error('Jotform API beklenmeyen bir format döndürdü: submissions listesi alınamadı.');
        }

        const rawSubmissions: JotformSubmission[] = responseData.content as JotformSubmission[];

        return rawSubmissions.map(normalizeSubmission);

    } catch (error) {
        console.error(`Form ${formId} verisi çekilirken hata oluştu:`, error);
        throw error;
    }
};