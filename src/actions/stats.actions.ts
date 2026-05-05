'use server'

import { StatsServices } from "@/services/stats.service";

export async function getStatsAction() {
    const result = await StatsServices.getStats();
    return result;
}
export async function getPublicStatsAction() {
    const result = await StatsServices.publicStats();
    return result;
}