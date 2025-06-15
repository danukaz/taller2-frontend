"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiBackend } from "@/clients/axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";


// Esquema de validación con Zod (manteniendo los nombres del backend)
const formSchema = z.object({
    firtsName: z.string().min(1, { message: "Nombre es requerido" }),
    lastName: z.string().min(1, { message: "Apellido es requerido" }),
    thelephone: z.string().min(8, { message: "Teléfono debe tener al menos 8 dígitos" }),
    email: z.string().email({ message: "Ingrese un correo electrónico válido." }).nonempty({ message: "Email es requerido." }),
    password: z.string()
        .min(6, { message: "Mínimo 6 caracteres" })
        .refine(pwd => /[A-Z]/.test(pwd), { message: "Requiere al menos una mayúscula" })
        .refine(pwd => /[a-z]/.test(pwd), { message: "Requiere al menos una minúscula" })
        .refine(pwd => /[0-9]/.test(pwd), { message: "Requiere al menos un número" })
        .refine(pwd => /[^A-Za-z0-9]/.test(pwd), { message: "Requiere al menos un carácter especial" }),
    confirmPassword: z.string().nonempty({ message: "Confirma tu contraseña" }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

export const RegisterPage = () => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firtsName: "",
            lastName: "",
            thelephone: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);

        try {
            console.log("Form submitted with values:", values);
            console.log("Sending to backend:", JSON.stringify(values, null, 2));

            // Enviar directamente los datos tal como funciona en Postman
            const data = await ApiBackend.post<any>('/Auth/register', values);
            console.log("Response from API:", data);

            // Mostrar Alert de éxito
            setShowSuccessAlert(true);
            form.reset();

            // Ocultar alerta después de 5 segundos
            setTimeout(() => setShowSuccessAlert(false), 5000);

        } catch (error: any) {
            console.log("Error during form submission:", error);

            // Mostrar Alert de error
            setErrorMessage("Error en el registro. Por favor, verifica los datos.");
            setShowErrorAlert(true);

            // Ocultar alerta de error después de 5 segundos
            setTimeout(() => setShowErrorAlert(false), 5000);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Alertas fijas en la esquina superior derecha */}
            {(showSuccessAlert || showErrorAlert) && (
                <div className="fixed top-4 right-4 w-80 z-50">
                    {showSuccessAlert && (
                        <Alert variant="default" className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-800">¡Éxito!</AlertTitle>
                            <AlertDescription className="text-green-700">
                                Registro completado correctamente.
                            </AlertDescription>
                        </Alert>
                    )}

                    {showErrorAlert && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {errorMessage}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            )}

            {/* Lado izquierdo */}
            <div className="md:w-1/2 w-full bg-blue-700 text-white flex flex-col justify-center items-center p-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Únete a <br className="hidden md:block" /> Nombre del negocio 🚀
                </h1>
                <p className="text-base md:text-lg text-justify max-w-md">
                    Regístrate para acceder a ofertas exclusivas y gestionar
                    tus pedidos de manera fácil y segura.
                </p>
                <p className="mt-10 text-xs md:text-sm text-gray-200 text-center">
                    © 2025 IDWM. Todos los derechos reservados.
                </p>
                <Button variant={"outline"} className="mt-4 text-blue-600" onClick={() => router.back()}>
                    <ArrowLeftIcon /> Volver
                </Button>
            </div>

            {/* Lado derecho */}
            <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-6 py-10">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">Crear tu cuenta</h2>
                    <h3 className="text-lg md:text-xl font-medium mb-2 text-center md:text-left">
                        ¡Únete a nosotros!
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 text-center md:text-left">
                        ¿Ya tienes cuenta?{' '}
                        <a href="login" className="text-blue-600 underline">
                            Inicia sesión aquí
                        </a>
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Nombre y Apellido en una fila */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firtsName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Juan" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Apellido</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Pérez" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="correo@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="thelephone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teléfono</FormLabel>
                                        <FormControl>
                                            <Input placeholder="966434380" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">Crear cuenta</Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-sm text-center md:text-left">
                        Al registrarte, aceptas nuestros{' '}
                        <a href="#" className="text-blue-600 underline">
                            términos y condiciones
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};