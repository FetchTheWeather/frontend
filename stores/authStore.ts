import type {SuccessResponse} from "~/types/models/SuccessResponse";
import {z} from "zod";
import {defineStore} from "pinia";
import type {ValidationResponse} from "~/types/models/Validation";

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        isLoggedIn: ref<boolean>(false),
        loginResponse: ref<SuccessResponse | undefined>(undefined)
    }),
    actions: {
        async login(email: string, password: string): Promise<ValidationResponse> {

            const schema = z.object({
                email: z.email("Invalide E-mail"),
                password: z.string().min(6, "Wachtwoord moet ten minste 6 karakters zijn"),
            });

            const validation = schema.safeParse({
                email: email,
                password: password,
            })

            if (!validation.success) {
                return {
                    success: false,
                    message: "Gefaald om in te loggen",
                }
            }

            try {
                const result = await $fetch<SuccessResponse>("https://ftw.pietr.dev/auth/login", {
                    method: "POST",
                    body: {
                        email: email,
                        password: password,
                    },
                    headers: {'Content-Type': 'application/json'},
                });

                this.isLoggedIn = true;
                this.loginResponse = result;

                return {
                    success: true,
                    message: undefined
                }
            } catch (error: any) {
                return {
                    success: false,
                    message: "Login failed.",
                }
            }
        },

        logOut(): void {
            this.loginResponse = undefined
            this.isLoggedIn = false
        }
    },
    persist: true
});
